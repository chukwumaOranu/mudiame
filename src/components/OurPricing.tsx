import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { FALLBACK_BOOKING_OPTIONS, getPublicBookingOptions } from "../api/bookingApi";

const categoryDescriptions: Record<string, string> = {
  Nails: "Glossy, salon-inspired nail essentials with lasting color payoff.",
  Lips: "Smooth lip staples designed for shine, definition, and everyday glam.",
  Eyes: "Richly pigmented eye products made for soft or bold expression.",
  "Self-Care": "Beauty care essentials selected for nourishment, comfort, and results.",
};

const OurPricing = () => {
  const pricingQuery = useQuery({
    queryKey: ["home", "pricing"],
    queryFn: getPublicBookingOptions,
  });

  const pricingItems = pricingQuery.data?.items?.length
    ? pricingQuery.data.items
    : FALLBACK_BOOKING_OPTIONS;

  const [leftColumn, rightColumn] = useMemo(() => {
    const sortedItems = [...pricingItems]
      .sort((a, b) => a.sort_order - b.sort_order)
      .slice(0, 4);
    const midpoint = Math.ceil(sortedItems.length / 2);
    return [sortedItems.slice(0, midpoint), sortedItems.slice(midpoint)];
  }, [pricingItems]);

  const renderPriceItem = (
    item: { id: number; name: string; category: string; amount_ngn: number }
  ) => (
    <div className="price-tbl d-flex" key={item.id}>
      <div className="flex-grow-1">
        <h4 className="text-primary">{item.name}</h4>
        <p>{categoryDescriptions[item.category] || "Premium beauty essentials tailored for confident everyday use."}</p>
      </div>
      <div className="price-val align-self-center">
        <h3 className="text-secondry">NGN {item.amount_ngn.toLocaleString()}</h3>
      </div>
    </div>
  );

  return (
    <>
      {pricingQuery.isError && (
        <p style={{ textAlign: "center", color: "#b42318", marginBottom: "20px" }}>
          Live pricing could not be loaded, so saved prices are being shown.
        </p>
      )}
      <div className="row">
        <div className="col-lg-6 col-md-12 col-sm-12">
          {leftColumn.map(renderPriceItem)}
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12">
          {rightColumn.map(renderPriceItem)}
        </div>
      </div>
    </>
  );
};

export default OurPricing;
