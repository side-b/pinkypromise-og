import type { PromiseState } from "../lib/types";

import { formatPromiseState, promiseColors } from "../lib/utils";
import { Fingers } from "./Fingers";

type PromiseCardData = {
  bodyText: string;
  colors: ReturnType<typeof promiseColors>;
  signedOn: string;
  state: PromiseState;
  title: string;
};

export function PromiseCard({
  promiseData,
  promiseId,
}: {
  promiseData: PromiseCardData;
  promiseId: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        color: promiseData.colors.contentColor,
        width: 400,
        height: 400,
        fontWeight: 400,
      }}
    >
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          height: 400,
          padding: "32px 32px 24px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 14,
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingBottom: 24,
              paddingTop: 2,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <div style={{ display: "flex" }}>
                Pinky Promise
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 18,
                  fontWeight: 800,
                }}
              >
                {promiseId}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 4,
              }}
            >
              <div style={{ display: "flex" }}>
                {promiseData.signedOn}
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 18,
                  fontWeight: 800,
                }}
              >
                <strong>{formatPromiseState(promiseData.state)}</strong>
              </div>
            </div>
          </div>
        </div>
        <h1
          style={{
            display: "flex",
            overflow: "hidden",
            margin: 0,
            padding: "14px 0 8px",
            fontSize: 32,
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontWeight: 600,
          }}
        >
          {promiseData.title}
        </h1>
        <div
          style={{
            display: "flex",
            overflow: "hidden",
            height: `${3 * 28}px`,
            // display: "-webkit-box",
            // WebkitBoxOrient: "vertical",
            // WebkitLineClamp: 3,
            lineHeight: "28px",
            wordBreak: "break-word",
          }}
        >
          {promiseData.bodyText}
        </div>
        <div
          style={{
            flexGrow: 1,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <Fingers color={promiseData.colors.contentColor} />
        </div>
      </section>
    </div>
  );
}
