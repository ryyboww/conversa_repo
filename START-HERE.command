#!/usr/bin/env bash
set -u
cd "$(dirname "$0")"
echo "Convera Strategies - local framework bootstrap"
echo
npm run launch:bootstrap
status=$?
echo
if [ $status -ne 0 ]; then
  echo "Bootstrap stopped. Read the message above; no launch status should be marked complete until the command passes."
fi
read -r -p "Press Return to close..." _
exit $status
