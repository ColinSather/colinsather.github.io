# Setting up a LAMP development environment using WSL
WSL stands for Windows Subsystem for Linux, it was created for Windows developers to use Linux commands and programs. It's defiantly more difficult to set up opposed to a standard Linux installation. Which is acceptable because WSL is an innovative technology.

I've been searching for a new local development environment other than using dated desktop apps such as AMPPS. I am doing this because I want my local dev environment to be identical to my production Linux server. I was surprised how much more difficult it was to set up mysql version 8 on Windows Subsystem for Linux.

**Powershell Location of Debian 10 WSL Files**
```
C:\Users\$ENV:USERNAME\AppData\Local\Packages\TheDebianProject.DebianGNULinux_76v4gfsz19hv4\LocalState\rootfs\var\www\html
```

### MYSQL Server Ver 8.0.21 Installation

```
# 3 Tools needed to install MYSQL 8
sudo apt-get install lsb-release gnupg wget
```

```
# Begin installing MYSQL Ver 8.0.21
cd /tmp
wget https://dev.mysql.com/get/mysql-apt-config_0.8.15-1_all.deb
sudo dpkg -i mysql-apt-config_0.8.15-1_all.deb
sudo apt-get update
sudo apt-get install mysql-server
```

Set a root password and select the recommended security settings, same process as non WSL. The weird thing about MYSQL 8 in WSL is that there isn't an executable MYSQL shell script in `/etc/init.d` which causes an error when starting the MYSQL service.

```
wget https://raw.githubusercontent.com/mysql/mysql-server/8.0/support-files/mysql.server.sh
sudo cp mysql.server.sh /etc/init.d/mysql
sudo chmod +x /etc/init.d/mysql
```

Next edit the basedir and datadir in the mysql shell script by running sudo nano mysql.

```
# If you change base dir, you must also change datadir. These may get
# overwritten by settings in the MySQL configuration files.
basedir=/usr
datadir=/var/lib/mysql
```

There's also isn't a mysqld folder in /var/run not sure if this is a WSL problem or something. To fix this create and change ownership with below commands.

**Note** the below directory gets deleted after reboot for some reason. It may be best to write a script to automatically create and change owners of mysqld.

```
sudo mkdir -p /var/run/mysqld
sudo chown mysql:mysql /var/run/mysqld
```


Finally run `sudo ./etc/init.d/mysql start` and enjoy using MYSQL 8 in Windows Subsystem for Linux!

#### Note: you may need to modify the authentication plugin
```
# Modify authentication plug in
mysql -u root -p
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password
BY 'password'
```

### Apache2 and PHP 7 Installation
```
sudo apt-get install apache2
sudo service apache2 start
sudo apt-get install php php-mysqli
sudo systemctl restart apache2
```
Now your ready to start developing LAMP stack websites using WSL.

### Sources
1. [Helpful Article for WSL MYSQL 8 Installation](https://www.58bits.com/blog/2020/05/03/installing-mysql-80-under-wsl-2-and-ubuntu)
2. [Standard MYSQL Installation on Debian 10](https://www.tecmint.com/install-mysql-on-debian-10/)