interface QuantityStepperProps {
    value: number;
    onDecrement: () => void;
    onIncrement: () => void;
    decreaseLabel: string;
    increaseLabel: string;
}

/** 수량 ± 컨트롤 (presentational). 카트 라인·상세 담기 폼이 공유 */
export function QuantityStepper({
    value,
    onDecrement,
    onIncrement,
    decreaseLabel,
    increaseLabel,
}: QuantityStepperProps) {
    return (
        <div className="flex items-center gap-1">
            <button
                type="button"
                aria-label={decreaseLabel}
                onClick={onDecrement}
                className="border-border hover:bg-muted inline-flex h-7 w-7 items-center justify-center rounded border text-sm"
            >
                −
            </button>
            <span className="w-8 text-center text-sm tabular-nums">{value}</span>
            <button
                type="button"
                aria-label={increaseLabel}
                onClick={onIncrement}
                className="border-border hover:bg-muted inline-flex h-7 w-7 items-center justify-center rounded border text-sm"
            >
                +
            </button>
        </div>
    );
}
