import { TIME } from "../constants/time";
import { sleep } from "../utils";

export async function retry(
  func,
  retryCount,
) {
  let count = retryCount;
  while (count >= 0) {
    try {
      const res = await func();
      return res; // Only returns once the function succeeds
    } catch (err) {
      // Use a Promise-based delay
      if (count) {
        count = count - 1;
        if (count <= 0) {
          throw err;
        }
      }
      await sleep(TIME.FIVE_SECONDS);
    }
  }
}
