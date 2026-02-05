export default function Button({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="bg-black text-white px-4 py-2 rounded hover:opacity-80 transition"
    >
      {children}
    </button>
  )
}