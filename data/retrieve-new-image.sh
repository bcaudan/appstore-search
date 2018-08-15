#!/usr/bin/env bash

curl -L $1 \
  | grep product-hero__media -C 10 \
  | grep img \
  | sed 's/[^"]*"\([^"]*\)".*/\1/' \
  | sed 's/246x0w/175x0w/'
