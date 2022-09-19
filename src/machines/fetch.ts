import { Machine, assign } from "xstate";
import { PaginatedResult } from "../api/PaginatedResult";

export interface FetchState<T> {
  matches: (value: keyof FetchStates["states"]) => boolean;
  context: PaginatedResult<T>;
}

interface FetchStates {
  states: {
    pending: {};
    successful: {};
    failed: {};
  };
}

export type FetchMachineEvents =
  | { type: "FETCH" }
  | ({ type: "RESOLVE" } & PaginatedResult<any>)
  | { type: "REJECT" };

export const fetchMachine = <T>() =>
  Machine<PaginatedResult<T>, FetchStates, FetchMachineEvents>(
    {
      id: "fetch",
      initial: "pending",
      context: {
        data: [],
        page: 1,
        total: 0,
        totalPages: 0,
      },
      states: {
        pending: {
          entry: ["fetchData"],
          on: {
            RESOLVE: { target: "successful", actions: ["setResults"] },
            REJECT: { target: "failed" },
          },
        },
        failed: {
          on: {
            FETCH: "pending",
          },
        },
        successful: {
          on: {
            FETCH: "pending",
          },
        },
      },
    },
    {
      actions: {
        setResults: assign((ctx, event: any) => ({
          ...event,
        })),
      },
    }
  );
