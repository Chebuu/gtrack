#!/bin/bash
if [ ! -f ./bigchaindb/docker-compose.yml ]; then
    git clone https://github.com/bigchaindb/bigchaindb.git
fi
cd bigchaindb && make run