// src/buy/ProductDetailPanel.jsx
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function ProductDetailPanel({
  item,
  open,
  setOpen,
  onAddToCart,
}) {
  if (!item) return null;

  // Inline desktop panel (sticky)
  const InlinePanel = (
    <div className="hidden lg:block bg-white rounded-xl shadow p-4 sticky top-4">
      <DetailContent item={item} onAddToCart={() => onAddToCart(item)} />
    </div>
  );

  // Mobile slide-over using Headless UI Dialog + Transition
  const SlideOver = (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50 lg:hidden" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-8">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-out duration-200"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in duration-150"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col bg-white shadow-xl">
                    <div className="flex items-center justify-between px-4 py-3 border-b">
                      <Dialog.Title className="text-sm font-semibold text-gray-900">
                        {item.name}
                      </Dialog.Title>
                      <button
                        onClick={() => setOpen(false)}
                        className="rounded p-2 hover:bg-gray-100"
                        aria-label="Close"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="p-4 overflow-y-auto">
                      <DetailContent item={item} onAddToCart={() => onAddToCart(item)} />
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );

  return (
    <>
      {InlinePanel}
      {SlideOver}
    </>
  );
}

function DetailContent({ item, onAddToCart }) {
  return (
    <div>
      <div className="aspect-video w-full mb-3 rounded-lg overflow-hidden bg-gray-50">
        <img src={item.image} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="flex items-center gap-2 mb-2">
        <span className="px-2 py-0.5 text-[10px] rounded-full bg-emerald-50 text-emerald-700">
          Fresh
        </span>
        {item.organic && (
          <span className="px-2 py-0.5 text-[10px] rounded-full bg-green-100 text-green-700">
            Organic
          </span>
        )}
      </div>

      <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
      <div className="text-sm text-gray-500">{item.brand || "FarmFresh"}</div>

      <div className="mt-2">
        <div className="text-emerald-700 text-xl font-bold">₹{item.price} <span className="text-sm text-gray-500 font-normal">/ kg</span></div>
        <div className="text-xs text-gray-500 mt-1">In stock: {item.stock} kg</div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          onClick={onAddToCart}
          className="col-span-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white py-2"
        >
          Add to cart
        </button>
        <button className="rounded-lg border border-gray-200 hover:bg-gray-50 py-2">
          Save
        </button>
        <button className="rounded-lg border border-gray-200 hover:bg-gray-50 py-2">
          Share
        </button>
      </div>

      <div className="mt-5">
        <h4 className="text-sm font-semibold text-gray-800">Details</h4>
        <ul className="text-sm text-gray-600 list-disc pl-5 mt-2 space-y-1">
          <li>Farm: {item.farm || "Local cooperative"}</li>
          <li>Harvested: {item.harvest || "This week"}</li>
          <li>Origin: {item.origin || "India"}</li>
        </ul>
      </div>
    </div>
  );
}
