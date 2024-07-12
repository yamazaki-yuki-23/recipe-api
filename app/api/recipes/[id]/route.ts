import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabaseClient';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { data, error } = await supabase.from('recipes').select('*').eq('id', params.id).single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 200 });
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { title, making_time, serves, ingredients, cost } = await req.json();
  const { data, error } = await supabase
    .from('recipes')
    .update({ title, making_time, serves, ingredients, cost, updated_at: new Date() })
    .eq('id', params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (data == null) {
    return NextResponse.json(null, { status: 404 });
  }
  return NextResponse.json(data[0], { status: 200 });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await supabase.from('recipes').delete().eq('id', params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ message: 'Recipe deleted' }, { status: 200 });
}
