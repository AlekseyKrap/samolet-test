export type TransformedType<T extends Record<string, unknown>> = {
    [K1 in keyof T]: K1 extends string
        ? {
              type: `set${K1}`;
              payload: T[K1];
          }
        : never;
};

export type TActionsR<
    T extends Record<string, unknown>
> = TransformedType<T> extends {
    [K in keyof TransformedType<T>]: infer P;
}
    ? P
    : never;
