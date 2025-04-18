export function StudentContent({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      className="mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-4 rounded-xl"
      {...props}
    >
      {children}
    </main>
  );
}
