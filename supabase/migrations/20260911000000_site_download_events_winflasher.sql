-- Count Windows flasher downloads as their own product (winflasher),
-- separate from Mac (flasher) and Skagway.
alter table public.site_download_events
  drop constraint site_download_events_product_check;

alter table public.site_download_events
  add constraint site_download_events_product_check
    check (product in ('flasher', 'winflasher', 'skagway'));
