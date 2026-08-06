import { NextResponse } from "next/server";

export function ok<T>(data: T, status = 200) { return NextResponse.json(data, { status }); }
export function fail(error: unknown, status = 400) { return NextResponse.json({ error: error instanceof Error ? error.message : "Unexpected error" }, { status }); }
