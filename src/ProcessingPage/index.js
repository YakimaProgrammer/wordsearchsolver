import { SimplePage } from "../SimplePage";

const SPLASH = [
    "Rome wasn't built in a day!",
    "Hey, at least this is faster than doing it by hand!",
    "Quick! Hide your phone! Your teacher is watching!",
    "I hope this works!",
    "And now we wait."
][Math.floor(Math.random() * 5)];

export function ProcessingPage() {
    return <SimplePage
        title="Processing..."
        subtitle={SPLASH}
        content="This usually takes about 10 to 15 seconds"
    />
}
