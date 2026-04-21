export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="relative w-full max-w-md">{children}</div>
    </div>
  );
}
