import notFoundSvg from '../../assets/not-found-illustration.svg';

export default function ThreadNotFound({
  filterThreads,
}: Readonly<{
  filterThreads: string;
}>) {
  return (
    <div className="h-full pt-4">
      <div className="grid gap-y-3">
        <img
          className="mx-auto block h-[178px] w-[256px] md:h-[228px] md:w-[326px]"
          src={notFoundSvg}
          alt="Threads is empty"
        />

        <p className="text-center">
          Thread with name{' '}
          <span className="inline-block rounded-md bg-gray-300 px-2 py-1 dark:bg-gray-700">
            {filterThreads}
          </span>{' '}
          is not found
        </p>
      </div>
    </div>
  );
}
