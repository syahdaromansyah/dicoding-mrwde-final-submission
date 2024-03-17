import type {
  AnchorHTMLAttributes,
  BlockquoteHTMLAttributes,
  ClassAttributes,
  HTMLAttributes,
  ImgHTMLAttributes,
  LiHTMLAttributes,
  OlHTMLAttributes,
  TableHTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from 'react';
import { useMemo } from 'react';
import type { ExtraProps } from 'react-markdown';
import Markdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import atomOneDark from 'react-syntax-highlighter/dist/esm/styles/hljs/atom-one-dark';
import rehypeRaw from 'rehype-raw';
import rehypeReact from 'rehype-react';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';

type TComponentProps<C> = ClassAttributes<C> & ExtraProps;

export default function MarkdownContent({
  children,
}: Readonly<{
  children: string;
}>) {
  const customComponentMarkdown = useMemo(() => customComponentMd(), []);

  return (
    <Markdown
      remarkPlugins={[remarkGfm, remarkHtml]}
      rehypePlugins={[rehypeReact, rehypeRaw, rehypeSanitize]}
      components={customComponentMarkdown}
    >
      {children}
    </Markdown>
  );
}

function customComponentMd() {
  return {
    h1(
      props: TComponentProps<HTMLHeadingElement> &
        HTMLAttributes<HTMLHeadingElement>,
    ) {
      const { node: _, children, ...rest } = props;

      return (
        <h1
          {...rest}
          className="mb-4 border-b-2 border-gray-300 pb-4 font-space-grotesk text-4xl font-bold lg:text-5xl dark:border-gray-700"
        >
          {children}
        </h1>
      );
    },
    h2(
      props: TComponentProps<HTMLHeadingElement> &
        HTMLAttributes<HTMLHeadingElement>,
    ) {
      const { node: _, children, ...rest } = props;

      return (
        <h2
          {...rest}
          className="mb-4 border-b-2 border-gray-300 pb-4 font-space-grotesk text-3xl font-bold lg:text-4xl dark:border-gray-700"
        >
          {children}
        </h2>
      );
    },
    h3(
      props: TComponentProps<HTMLHeadingElement> &
        HTMLAttributes<HTMLHeadingElement>,
    ) {
      const { node: _, children, ...rest } = props;

      return (
        <h3
          {...rest}
          className="mb-4 border-b-2 border-gray-300 pb-2 font-space-grotesk text-2xl font-bold lg:text-3xl dark:border-gray-700"
        >
          {children}
        </h3>
      );
    },
    h4(
      props: TComponentProps<HTMLHeadingElement> &
        HTMLAttributes<HTMLHeadingElement>,
    ) {
      const { node: _, children, ...rest } = props;

      return (
        <h4
          {...rest}
          className="mb-4 border-b-2 border-gray-300 pb-2 font-space-grotesk text-xl font-bold lg:text-2xl dark:border-gray-700"
        >
          {children}
        </h4>
      );
    },
    h5(
      props: TComponentProps<HTMLHeadingElement> &
        HTMLAttributes<HTMLHeadingElement>,
    ) {
      const { node: _, children, ...rest } = props;

      return (
        <h5
          {...rest}
          className="mb-4 border-b-2 border-gray-300 pb-2 font-space-grotesk text-lg font-bold lg:text-xl dark:border-gray-700"
        >
          {children}
        </h5>
      );
    },
    h6(
      props: TComponentProps<HTMLHeadingElement> &
        HTMLAttributes<HTMLHeadingElement>,
    ) {
      const { node: _, children, ...rest } = props;

      return (
        <h6
          {...rest}
          className="mb-4 border-b-2 border-gray-300 pb-2 font-space-grotesk font-bold lg:text-lg dark:border-gray-700"
        >
          {children}
        </h6>
      );
    },
    p(
      props: TComponentProps<HTMLParagraphElement> &
        HTMLAttributes<HTMLParagraphElement>,
    ) {
      const { node: _, ...rest } = props;

      return <p {...rest} className="mb-4 lg:text-lg" />;
    },
    blockquote(
      props: TComponentProps<HTMLQuoteElement> &
        BlockquoteHTMLAttributes<HTMLQuoteElement>,
    ) {
      const { node: _, ...rest } = props;

      return (
        <blockquote
          {...rest}
          className="mb-4 border-l-4 border-gray-600 pl-2 text-slate-600 dark:text-slate-300"
        />
      );
    },
    a(
      props: TComponentProps<HTMLAnchorElement> &
        AnchorHTMLAttributes<HTMLAnchorElement>,
    ) {
      const { node: _, children, ...rest } = props;

      return (
        <a
          {...rest}
          className="inline-block text-blue-600 transition hover:underline dark:text-blue-400"
        >
          {children}
        </a>
      );
    },
    hr(props: TComponentProps<HTMLHRElement> & HTMLAttributes<HTMLHRElement>) {
      const { node: _, ...rest } = props;

      return <hr {...rest} className="mb-4" />;
    },
    img(
      props: TComponentProps<HTMLImageElement> &
        ImgHTMLAttributes<HTMLImageElement>,
    ) {
      const { node: _, ...rest } = props;

      return <img {...rest} className="mx-auto block" alt="" />;
    },
    ul(
      props: TComponentProps<HTMLUListElement> &
        HTMLAttributes<HTMLUListElement>,
    ) {
      const { node: _, ...rest } = props;

      return (
        <div className="mb-4 pl-4 ">
          <ul
            {...rest}
            className="list-inside list-disc [&_ul]:mb-0 [&_ul]:pl-2"
          />
        </div>
      );
    },
    ol(
      props: TComponentProps<HTMLOListElement> &
        OlHTMLAttributes<HTMLOListElement>,
    ) {
      const { node: _node, ...rest } = props;

      return (
        <div className="mb-4 pl-4 ">
          <ol
            {...rest}
            className="list-inside list-decimal [&_ul]:mb-0 [&_ul]:pl-2"
          />
        </div>
      );
    },
    li(
      props: TComponentProps<HTMLLIElement> & LiHTMLAttributes<HTMLLIElement>,
    ) {
      const { node: _, ...rest } = props;

      return <li {...rest} className="lg:text-lg" />;
    },
    code(props: TComponentProps<HTMLElement> & HTMLAttributes<HTMLElement>) {
      const { node: _node, ref: _ref, children, className, ...rest } = props;
      const match = /language-(\w+)/.exec(className ?? '');

      return match ? (
        <div className="mb-4 overflow-hidden rounded [&_code]:!font-jetbrains-mono md:[&_code]:!text-lg">
          <SyntaxHighlighter
            {...rest}
            showLineNumbers
            PreTag="div"
            language={match[1]}
            style={atomOneDark}
          >
            {String(children ?? '').replace(/\n$/, '')}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code
          {...rest}
          className="inline-block rounded-md bg-gray-800 px-2 py-1 font-jetbrains-mono text-slate-100"
        >
          {children}
        </code>
      );
    },
    table(
      props: TComponentProps<HTMLTableElement> &
        TableHTMLAttributes<HTMLTableElement>,
    ) {
      const { node: _, ...rest } = props;

      return (
        <table
          {...rest}
          className="mb-4 border-collapse border-0 border-gray-800"
        />
      );
    },
    th(
      props: TComponentProps<HTMLTableCellElement> &
        ThHTMLAttributes<HTMLTableCellElement>,
    ) {
      const { node: _, ...rest } = props;

      return (
        <th
          {...rest}
          className="border-2 border-gray-300 bg-gray-200 p-4 font-space-grotesk dark:border-gray-700 dark:bg-gray-800"
        />
      );
    },
    td(
      props: TComponentProps<HTMLTableCellElement> &
        TdHTMLAttributes<HTMLTableCellElement>,
    ) {
      const { node: _, ...rest } = props;

      return (
        <td
          {...rest}
          className="border-2 border-gray-300 p-4 dark:border-gray-700"
        />
      );
    },
  };
}
