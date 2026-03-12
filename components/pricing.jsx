"use client";

import React from "react";
import { Card, CardContent } from "./ui/card";
import { Check } from "lucide-react";
import { Button } from "./ui/button";

const plans = [
  {
    name: "Free",
    price: "$0",
    credits: "0 Credits / month",
    features: [
      "Access to doctor listings",
      "Limited appointment booking",
      "Standard support",
    ],
    buttonText: "Current Plan",
    disabled: true,
  },
  {
    name: "Standard",
    price: "$49",
    credits: "10 Credits / month",
    features: [
      "10 Consultation credits",
      "Priority booking",
      "Email support",
      "Video consultation access",
    ],
    buttonText: "Upgrade to Standard",
    highlight: true,
  },
  {
    name: "Premium",
    price: "$99",
    credits: "24 Credits / month",
    features: [
      "24 Consultation credits",
      "Instant booking",
      "24/7 dedicated support",
      "Full history access",
      "Family profile sharing",
    ],
    buttonText: "Upgrade to Premium",
  },
];

const Pricing = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {plans.map((plan, index) => (
        <Card
          key={index}
          className={`relative border-emerald-900/30 shadow-lg transition-transform hover:scale-105 ${plan.highlight ? 'bg-gradient-to-b from-emerald-950/50 to-emerald-900/10 border-emerald-500/50' : 'bg-emerald-950/20'
            }`}
        >
          {plan.highlight && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-black text-xs font-bold px-3 py-1 rounded-full">
              MOST POPULAR
            </div>
          )}
          <CardContent className="p-8 flex flex-col h-full">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-emerald-400 mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="mt-2 text-sm text-emerald-300/70 font-medium">{plan.credits}</p>
            </div>

            <ul className="space-y-4 mb-8 flex-grow">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  {feature}
                </li>
              ))}
            </ul>

            <Button
              className={`w-full ${plan.highlight ? 'bg-emerald-500 hover:bg-emerald-600 text-black' : 'bg-emerald-900/50 hover:bg-emerald-900/80'
                }`}
              disabled={plan.disabled}
            >
              {plan.buttonText}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Pricing;
