import { AG_GRID_LOCALE_EN } from "./locale.en";

export var AG_GRID_LOCALE_ES = {};

// Create a dummy locale based on english but prefix everything with zzz
Object.keys(AG_GRID_LOCALE_EN).forEach(function (key) {
  AG_GRID_LOCALE_ES[key] = AG_GRID_LOCALE_EN[key];
});

