
import { Button } from "@/components/ui/button";

export default function NegotiationOptions({ price, onSelect }) {
  const suggested = [
    price, 
    price - 200, 
    price - 300, 
    price - 400
  ];

  return (
    <div className="flex gap-2 mt-2 flex-wrap">
      {suggested.map((p, idx) => (
        <Button
          key={idx}
          variant="outline"
          onClick={() => onSelect(p)}
          className="rounded-full"
        >
          ₹{p}
        </Button>
      ))}
    </div>
  );
}
