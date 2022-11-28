import { $count } from "./stores";
import { addCountEvent } from "./events";

$count.on(addCountEvent, (state) => state + 1)