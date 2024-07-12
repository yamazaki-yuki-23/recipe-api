import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabaseClient'

/** レシピ作成 */
export async function POST(req: NextRequest) {
  const { title, making_time, serves, ingredients, cost } = await req.json();

  // 必須フィールドが欠けているかチェック
  if (!title || !making_time || !serves || !ingredients || !cost) {
    return NextResponse.json(
      {
        message: "Recipe creation failed!",
        required: "title, making_time, serves, ingredients, cost",
      },
      { status: 200 }
    );
  }

 const { data, error } = await supabase
    .from('recipes')
    .insert([{ title, making_time, serves, ingredients, cost }])
    .select();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(
    {
      message: "Recipe successfully created!",
      recipe: data,
    },
    { status: 200 }
  );
}

/** 全レシピ一覧を返す */
export async function GET() {
  const { data, error } = await supabase.from('recipes').select('*');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ recipes: data }, { status: 200 });
}
