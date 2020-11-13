#!/usr/bin/env bash
#
sudo wget https://raw.githubusercontent.com/mvdan/sh/master/cmd/shfmt/Dockerfile
sudo docker build -t jamesmstone/shfmt .
sudo docker run -it --rm -v /home/travis/build/christronyxyocum/tronitor/Travis/Scripts:/sh -w /sh mvdan/shfmt:latest -s -i 4 -ci -sr -d travis_tronitor.sh
sudo docker run -it --rm -v /home/travis/build/christronyxyocum/tronitor:/sh -w /sh mvdan/shfmt:latest -s -i 4 -ci -sr -d tronitor.sh
