import { notFound } from 'next/navigation';

export default function Home() {
  // ルートページにアクセスした場合、404ページを表示
  notFound();
}
