export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold">ShopCart by Claude</h1>
        <p className="mt-4 text-xl">
          Modern e-commerce platform built with Next.js 16 + React 19 +
          Tailwind 4
        </p>
        <div className="mt-8">
          <p className="text-primary-500">✓ Next.js 16</p>
          <p className="text-primary-500">✓ React 19</p>
          <p className="text-primary-500">✓ TypeScript (strict mode)</p>
          <p className="text-primary-500">✓ Tailwind CSS 4</p>
        </div>
      </div>
    </main>
  )
}
