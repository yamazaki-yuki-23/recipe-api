import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabaseClient'

export async function POST(req: NextRequest) {
  const { title, making_time, serves, ingredients, cost } = await req.json();
  const { data, error } = await supabase
    .from('recipes')
    .insert([{ title, making_time, serves, ingredients, cost }]);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (data == null) {
    return NextResponse.json(null, { status: 404 });
  }
  return NextResponse.json(data[0], { status: 200 });
}

export async function GET() {
  const { data, error } = await supabase.from('recipes').select('*');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 200 });
}
