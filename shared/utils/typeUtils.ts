/**
 * Use this as a type test to ensure that type A is a subtype of type B (that is, if you have a
 * value of type A, you can pass it to something that wants a B).
 *
 * Usage:
 * ```ts
 * type _Extends1 = AssertAExtendsB<'prod' | 'dev', string>; // ok
 * ```
 *
 * You'll get a type error if the types are not compatible.
 */
export type AssertAExtendsB<_A extends B, B> = never;

type _Extends1 = AssertAExtendsB<"prod" | "dev", string>;

// @ts-expect-error -- wrong way around
type _Extends2 = AssertAExtendsB<string, "prod" | "dev">;

// @ts-expect-error -- not compatible
type _Extends3 = AssertAExtendsB<{ a: 1 }, { b: 2 }>;
