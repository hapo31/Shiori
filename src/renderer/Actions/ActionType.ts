import { Action } from "redux";

export type AppAction<T extends string, Extra extends {} = {}> = Action<T> &
  { [K in keyof Extra]: Extra[K] };

type ExtraFunction<Arg extends any[], R> = (...args: Arg) => R;
type ActionCreator<Arg extends any[], Action> = (...args: Arg) => Action;

// 関数のoverload
export function createAppAction<A extends string>(
  type: A
): ActionCreator<any[], AppAction<A>>;
export function createAppAction<A extends string, Arg extends any[], R>(
  type: A,
  fn: ExtraFunction<Arg, R>
): ActionCreator<Arg, AppAction<A, R>>;
export function createAppAction<A extends string, Arg extends any[], R>(
  type: A,
  extraFunction?: ActionCreator<Arg, AppAction<A, R>>
) {
  return (...args: any[]) => {
    if (extraFunction) {
      const extra: any = extraFunction(...(args as any));
      return { type, ...extra };
    }
    return { type };
  };
}
