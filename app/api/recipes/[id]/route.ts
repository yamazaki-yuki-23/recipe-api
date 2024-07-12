import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabaseClient';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { data, error } = await supabase.from('recipes').select('*').eq('id', params.id).single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (!data) {
    return NextResponse.json(
      {
        message: "Recipe not found",
        recipe: [],
      },
      { status: 404 }
    );
  }

  return NextResponse.json(
    {
      message: "Recipe details by id",
      recipe: [data],
    },
    { status: 200 }
  );
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { title, making_time, serves, ingredients, cost } = await req.json();
  const { data, error } = await supabase
    .from('recipes')
    .update({ title, making_time, serves, ingredients, cost, updated_at: new Date() })
    .eq('id', params.id)
    .select();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (!data || data.length === 0) {
    return NextResponse.json(
      {
        message: "Recipe update failed!",
        recipe: [],
      },
      { status: 404 }
    );
  }

  return NextResponse.json(
    {
      message: "Recipe successfully updated!",
      recipe: data,
    },
    { status: 200 }
  );
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { data, error } = await supabase.from('recipes').delete().eq('id', params.id).select();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (!data || data.length === 0) {
    return NextResponse.json(
      { message: "No Recipe found" },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { message: "Recipe successfully removed!" },
    { status: 200 }
  );
}
