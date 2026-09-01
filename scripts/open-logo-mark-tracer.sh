#!/bin/bash
# Open the Mach II Labs logo-mark node tracer (same idea as lunar-lander / pogo-wing tracers).
ROOT="$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)"
open "${ROOT}/scripts/trace-logo-mark.html"
