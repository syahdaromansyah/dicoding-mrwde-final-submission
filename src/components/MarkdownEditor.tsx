import MarkdownContent from '@/components/MarkdownContent';
import MDEditor from '@uiw/react-md-editor';
import cn from 'classnames';
import rehypeSanitize from 'rehype-sanitize';

const customMDComponents = {
  preview: (source: string) => <MarkdownContent>{source}</MarkdownContent>,
};

export default function MarkdownEditor({
  value,
  handleValue,
}: Readonly<{
  value: string;
  handleValue: (inputValue?: string | undefined) => void;
}>) {
  return (
    <div
      className={cn(
        'h-full',
        '[&_.w-md-editor-text-input]:!text-lg',
        'md:[&_.w-md-editor-text-input]:!text-xl',
        '[&_.w-md-editor-text-input]:!font-jetbrains-mono',
        '[&_.w-md-editor-text-input]:!font-semibold',
        '[&_.w-md-editor-text-pre_>_code]:!text-lg',
        'md:[&_.w-md-editor-text-pre_>_code]:!text-xl',
        '[&_.w-md-editor-text-pre_>_code]:!font-jetbrains-mono',
        '[&_.w-md-editor-text-pre_>_code]:!font-semibold',
      )}
    >
      <MDEditor
        preview="edit"
        height="100%"
        visibleDragbar={false}
        components={customMDComponents}
        value={value}
        onChange={handleValue}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
      />
    </div>
  );
}
