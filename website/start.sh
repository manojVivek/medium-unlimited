#!/bin/bash

#serve -s ./_site -p 80 & 
#docker run --rm   --volume="$PWD:/srv/jekyll"   -it jekyll/jekyll   jekyll build --watch


export PATH=$HOME/.gem/ruby/2.3.0/bin:$PATH

jekyll serve
