#!/bin/sh

# minimal startup script, will work with msh (this is best available in
# MMUless format).

# load the configuration information
. /etc/rc.d/rc.conf
/etc/rc.d/init.d/network restart

