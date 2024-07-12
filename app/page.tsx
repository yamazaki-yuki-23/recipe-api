import { notFound } from 'next/navigation';

export default function Home() {
  // 特定のエンドポイントに対するリダイレクトを設定
  if (typeof window !== 'undefined') {
    const path = window.location.pathname;
    if (path !== '/recipes' && !path.startsWith('/recipes/')) {
      notFound();
    }
  }

  return (
    <div>
      <h1>Welcome to the Recipe API</h1>
      <p>Please use the /recipes endpoint to interact with the API.</p>
    </div>
  );
}
