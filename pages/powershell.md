All commands need to be ran as admin in PowerShell.
___

Copying files from a remote computer
```
cp -Path \\serverb\c$\programs\temp\test.txt -Destination \\servera\c$\programs\temp\test.txt
```

Run psexec cmd on a remote machine replacing computer and user name as needed.

```
psexec \\some-computername -u some.domain.com\someuser -h -i cmd
```

Getting the serial number of a remote machine
```
wmic /node:some-ip-address bios get serialnumber
```

# Check for Windows updates using powershell

Run the command below, and for now on confirm what updates need to be made before blindly rebooting.

```
wmic qfe list
```

To check Windows updates on remote machines run this command instead. Be sure to run Powershell as administrator!
```
wmic /node:<IP address> qfe list
```

# Local admin password solution scripting

The local admin password solution or LAPS is a process of automatically assigning admin credentials to a active directory computers in a network. The password is stored in plain text as the property "ms-mcs-admpwd" of any given AD computer.

For creating local administrative users [see this link.](https://operating-systems.wonderhowto.com/how-to/create-admin-user-account-using-cmd-prompt-windows-0125689/)

```
# PowerShell command to get the admin password of given a particular AD computer
Get-ADComputer computer-name -Properties ms-mcs-admpwd

# Or search a specific domain other than the default
Get-ADComputer computer-name -Properties ms-mcs-admpwd -Server domain-name
```

This script really comes in handy for quickly searching a local admin password's expiration date in a human readable format. This script features a single conditional statement that determines whether or not the user wants to search a computer in a specific active directory domain.

```
Param(
    [Parameter(Mandatory=$true)]
    [Alias("CN","MachineName")]
    [String] $computer,

    [Parameter(Mandatory=$false)]
    [String] $server
)
Function Get-Pswd() {
    <#
    This script gets the local admin password and human readable password expiration time for a given computer.
    The script will query the network's default domain if the server variable is null.
    #>
    if ($server) {
        # next 3 lines are all one AD query
        get-adcomputer $computer -properties * -server $server | Select ms-mcs-admpwd, name, 
        @{Name="ms-mcs-admpwdexpirationtime";
        Expression={$([datetime]::FromFileTime([convert]::ToInt64($_."ms-MCS-AdmPwdExpirationTime",10)))}} | Format-List
    }
    else {
        # next 3 lines are all one AD query
        get-adcomputer $computer -properties * | Select ms-mcs-admpwd, name, enabled, 
        @{Name="ms-mcs-admpwdexpirationtime";
        Expression={$([datetime]::FromFileTime([convert]::ToInt64($_."ms-MCS-AdmPwdExpirationTime",10)))}} | Format-List
    }
}

# call function here
Get-Pswd $computer $server
```

## Why this script is useful
___

It is important to know LAPS expiration dates for network trouble shooting reasons. A common problem in IT is that a user cannot connect to a network file server and or printer, they may even be asked for admin credentials to do so. In such a case it would be smart to check if their local admin password is past it's expiration time. If the expiration date is in the past, there is a good chance the active directory computer has lost contact with the domain controller/authentication server.


Without the use of the above script querying the expiration date is tedious to read because the value of the expiration date is stored in Epoch time. Our script converts it into a base 64 date time format.

```
# Get expiration date in epoch time
Get-ADComputer computer-name -Properties * | Select ms-mcs-admpwdexpirationtime

ms-mcs-admpwdexpirationtime
---------------------------
         132591699350082824
```

Converting the output to a base 64 date and time is much easier to read. If this date did not auto renew that may indicate the selected active directory computer may not be connected to the network.

```
# Get expiration date in base 64 date and time
Get-ADComputer computer-name -Properties * |  Select @{Name="ms-mcs-admpwdexpirationtime"; Expression={$([datetime]::FromFileTime([convert]::ToInt64($_."ms-MCS-AdmPwdExpirationTime",10)))}}

ms-mcs-admpwdexpirat
--------------------
3/2/2021 8:45:35 AM
```

# Get-Bandwidth Script
```
#Get-Bandwidth.ps1
# Measure the Network interface IO over a period of half a minute (0.5)

$startTime = get-date
$endTime = $startTime.addMinutes(0.5)
$timeSpan = new-timespan $startTime $endTime

$count = 0
$totalBandwidth = 0

while ($timeSpan -gt 0)
{
   # Get an object for the network interfaces, excluding any that are currently disabled.
   $colInterfaces = Get-WmiObject -class Win32_PerfFormattedData_Tcpip_NetworkInterface |select BytesTotalPersec, CurrentBandwidth,PacketsPersec|where {$_.PacketsPersec -gt 0}

   foreach ($interface in $colInterfaces) {
      $bitsPerSec = $interface.BytesTotalPersec * 8
      $totalBits = $interface.CurrentBandwidth

      # Exclude Nulls (any WMI failures)
      if ($totalBits -gt 0) {
         $result = (( $bitsPerSec / $totalBits) * 100)
         Write-Host "Bandwidth utilized:`t $result %"
         $totalBandwidth = $totalBandwidth + $result
         $count++
      }
   }
   Start-Sleep -milliseconds 100

   # recalculate the remaining time
   $timeSpan = new-timespan $(Get-Date) $endTime
}

"Measurements:`t`t $count"

$averageBandwidth = $totalBandwidth / $count
$value = "{0:N2}" -f $averageBandwidth
Write-Host "Average Bandwidth utilized:`t $value %"
```