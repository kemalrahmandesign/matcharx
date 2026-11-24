# Launch checklist

Things to research and decide before Bagum starts selling. Tick them off as they're settled.

## Name

- [ ] Decide on a new name (working name: Bagum)
- [ ] Check the domain, Instagram and TikTok handles are free
- [ ] Check for existing trademarks on the name

## Ask the supplier in China

- [ ] Their FDA food facility registration number (needed to import food into the US)
- [ ] A certificate of analysis for each batch: lab results for lead and other heavy metals, pesticide residues and microbes
- [ ] Spec sheet: grade, harvest, shelf life, storage instructions
- [ ] Whether they fill and seal the tins in China, or ship bulk powder for us to pack here
- [ ] For the tins: confirmation they're food-grade and airtight
- [ ] An organic certificate, only if we want to say "organic"

## Importing (US side)

- [ ] Find a customs broker; they usually file the FDA Prior Notice for each shipment
- [ ] FSVP (Foreign Supplier Verification Program): as the importer, we must keep records showing the supplier's product is safe; the lab results above are part of this

## Label and packaging

- [ ] Required on the tin: the name ("Matcha" or "Matcha green tea powder"), net weight in grams and ounces (e.g. "Net Wt. 30 g (1.06 oz)"), and "Distributed by Bagum" with city, state and ZIP
- [ ] Country of origin: US Customs generally requires "Product of China" on imported food, including when it's repacked here. It can be small, on the back or bottom. Confirm with the customs broker.
- [ ] Ingredient list: single-ingredient foods generally don't need one, but "Ingredients: matcha green tea" is harmless to include
- [ ] Nutrition facts: required unless exempt. The low-volume exemption covers businesses with under 100 full-time employees selling under 100,000 units a year, with a yearly notice filed with FDA. Any health or nutrient claim ("rich in antioxidants" etc.) on the label, site or ads loses the exemption.
- [ ] Lot code and best-by date: not federally required, but worth printing for freshness and recalls

- [ ] SKU numbers: internal codes, one per product and size; we choose these ourselves
- [ ] Barcode (UPC) or QR code: a UPC is only needed for selling in stores or on Amazon; a QR code is optional, e.g. linking to the site or the preparation guide

## Containers

- [ ] Containers for the 30 g and 100 g tins
  - Dad found a company that makes them: **$1.50 each, shipped to the house**
  - To get from them: company name and contact, tin sizes and capacity, minimum order, lead time, whether they're food-safe and airtight, whether the label fits
- [ ] Sample-size containers: pick a size (e.g. 5 g to 10 g), container type and supplier

## Shipping

- [ ] Tracking numbers: these come with each shipping label from the carrier or shipping software, so nothing needs buying separately; choose the carrier/software
- [ ] Shipping boxes and packing materials
- [ ] Shipping rates and regions (the site currently assumes US and Canada, $8 flat, free over $75)

## Site

- [ ] Real prices, then set `salesOpen: true` in `src/lib/site.ts`
- [ ] Stripe account and secret key for checkout
- [ ] Newsletter service for the sign-up form
- [ ] Contact email, Instagram and TikTok links
- [ ] Label artwork for the blank centre of the tin
