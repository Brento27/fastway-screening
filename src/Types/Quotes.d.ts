export type DeliveryService = {
  type: string;
  name: string;
  labelcolour: string;
  labelcolour_array: string[]; // replace with a more specific type if available
  labelcolour_pretty: string;
  labelcolour_pretty_array: string[]; // replace with a more specific type if available
  weightlimit: number;
  baseweight: number;
  excess_labels_required: number;
  excess_label_price_normal: string;
  excess_label_price_frequent: string;
  excess_label_price_normal_exgst: string;
  excess_label_price_frequent_exgst: string;
  labelprice_normal: string;
  labelprice_frequent: string;
  labelprice_normal_exgst: string;
  labelprice_frequent_exgst: string;
  totalprice_normal: string;
  totalprice_frequent: string;
  totalprice_normal_exgst: number;
  totalprice_frequent_exgst: number;
};

type AdditionalService = {
  type: string;
  name: string;
  labelcolour: string;
  labelcolour_array: string[]; // replace with a more specific type if available
  labelcolour_pretty: string;
  labelcolour_pretty_array: string[]; // replace with a more specific type if available
  labelprice: number;
  labelprice_normal_exgst: number;
};

export type QuoteDetails = {
  isRural: boolean;
  isSaturdayDeliveryAvailable: boolean;
  from: string;
  to: string;
  state: string;
  postcode: string;
  delfranchise: string;
  delfranchise_code: string;
  pickfranchise: string;
  pickfranchise_code: string;
  pickfranchise_phone_number: string;
  currency_symbol: string;
  currency_taxword: string;
  delivery_timeframe_days: string;
  parcel_weight_kg: number;
  services: DeliveryService[];
  cheapest_service: DeliveryService[];
  additional_services: AdditionalService[];
  country_code: string;
  multiple_regions: boolean;
  delivery_rf_deeded: boolean;
};
