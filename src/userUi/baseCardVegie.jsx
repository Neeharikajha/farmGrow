// src/webpage/baseCardVegie.jsx
import { Fragment, useMemo, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { FiChevronDown, FiCheck, FiMinus, FiPlus } from "react-icons/fi";

export default function BaseCardVegie({
  item = {
    id: 1,
    brand: "fresho!",
    name: "Capsicum - Green (Loose)",
    image: "https://images.unsplash.com/photo-1549396535-c11d5c55b9df?w=800",
    variants: [
      { id: "250g", label: "250 g", price: 12.8, mrp: 16, offPct: 20 },
      { id: "500g", label: "500 g", price: 24.9, mrp: 31.2, offPct: 20 },
      { id: "1kg",  label: "1 kg",  price: 54.0, mrp: 78.08, offPct: 31 },
    ],
  },
  defaultVariantId = "1kg",
  className = "",
  onChange = () => {},
}) {
  const initial = useMemo(
    () => item.variants.find(v => v.id === defaultVariantId) || item.variants,
    [item.variants, defaultVariantId]
  );

  const [selected, setSelected] = useState(initial);
  const [qty, setQty] = useState(0);
  const offPct = selected?.offPct ?? Math.max(0, Math.round((1 - selected.price / selected.mrp) * 100));

  const add = () => {
    const q = qty + 1;
    setQty(q);
    onChange({ id: item.id, variant: selected.id, qty: q });
  };
  const sub = () => {
    const q = Math.max(0, qty - 1);
    setQty(q);
    onChange({ id: item.id, variant: selected.id, qty: q });
  };

  return (
    <div className={`bg-white rounded-2xl shadow p-3 w-full ${className}`}>
      {/* Image + badge */}
      <div className="relative rounded-xl border border-gray-100 p-2">
        {offPct > 0 && (
          <span className="absolute top-2 left-2 inline-flex items-center px-2 py-0.5 text-[10px] rounded bg-emerald-700 text-white">
            {offPct}% OFF
          </span>
        )}
        <div className="aspect-square w-full rounded-lg overflow-hidden bg-gray-50">
          <img src={item.image} alt="" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Title */}
      <div className="mt-3 text-xs text-gray-500">{item.brand}</div>
      <div className="text-sm font-medium text-gray-900 line-clamp-2">{item.name}</div>

      {/* Variant selector */}
      <div className="mt-2">
        <Listbox
          value={selected}
          onChange={(val) => { setSelected(val); onChange({ id: item.id, variant: val.id, qty }); }}
        >
          <div className="relative">
            <Listbox.Button className="w-full flex items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm">
              <span>{selected.label}</span>
              <FiChevronDown className="h-4 w-4 text-gray-500" />
            </Listbox.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-75"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Listbox.Options className="absolute z-30 mt-2 w-full rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden">
                {item.variants.map((v) => (
                  <Listbox.Option
                    key={v.id}
                    value={v}
                    className="cursor-pointer select-none p-3 text-sm hover:bg-gray-50 data-[selected]:bg-emerald-50"
                  >
                    {({ selected: isSel }) => (
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex flex-col">
                          <div className="text-xs text-emerald-700 font-semibold">{v.offPct}% OFF</div>
                          <div className="font-medium text-gray-900">{v.label}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">₹{v.price.toFixed(2)}</div>
                          <div className="text-xs text-gray-400 line-through">₹{v.mrp.toFixed(2)}</div>
                        </div>
                        {isSel && (
                          <FiCheck className="h-4 w-4 text-emerald-600 shrink-0" aria-hidden />
                        )}
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>

      {/* Price */}
      <div className="mt-2 flex items-end gap-2">
        <div className="text-lg font-semibold text-gray-900">₹{selected.price.toFixed(2)}</div>
        <div className="text-xs text-gray-400 line-through">₹{selected.mrp.toFixed(2)}</div>
      </div>

      {/* Offer ribbon (optional) */}
      {offPct > 0 && (
        <div className="mt-2 w-full inline-flex items-center justify-between rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
          Har Din Sasta!
          <FiCheck className="h-4 w-4" />
        </div>
      )}

      {/* Add / quantity controls */}
      <div className="mt-3">
        {qty === 0 ? (
          <button
            onClick={add}
            className="w-full rounded-lg border border-red-300 text-red-600 hover:bg-red-50 py-2 text-sm font-semibold"
          >
            Add
          </button>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={sub}
              className="rounded-lg border border-gray-200 hover:bg-gray-50 py-2 grid place-content-center"
              aria-label="Decrease quantity"
            >
              <FiMinus className="h-4 w-4" />
            </button>
            <div className="rounded-lg border border-gray-200 py-2 text-center font-semibold">
              {qty}
            </div>
            <button
              onClick={add}
              className="rounded-lg border border-gray-200 hover:bg-gray-50 py-2 grid place-content-center"
              aria-label="Increase quantity"
            >
              <FiPlus className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
