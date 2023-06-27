import socket
from time import sleep
import time
import winsound
import globals
import csv


robot = globals.robot
# robot = socket.socket() 

# robot_ip = '192.168.1.6'
# robot_port = 3000

# robot.connect((robot_ip, robot_port))

# sleep(2)


def setPosition(pos):
    robot.sendall(bytes(str(0), encoding="ascii"))
    stored = False
    while not stored:
        data = robot.recv(1)
        if data == b'0':
            sleep(2)
            robot.sendall(bytes(str(pos[0]), encoding="ascii"))
        if data == b'1':
            robot.sendall(bytes(str(pos[1]), encoding="ascii"))
        elif data == b'2':
            robot.sendall(bytes(str(pos[2]), encoding="ascii"))
        elif data == b'3':
            stored = True

def grabSample():
    robot.sendall(bytes(str(5), encoding="ascii"))
    returned = False
    while not returned:
        data = robot.recv(1)
        if data == b'1':

            returned = True

def positionRobot(samplePos):
    robot.sendall(bytes(str(samplePos[0]), encoding="ascii"))
    positioned = False
    while not positioned:
        data = robot.recv(1)
        if data == b'1':
            robot.sendall(bytes(str(samplePos[1]), encoding="ascii"))
        elif data == b'2':
            robot.sendall(bytes(str(samplePos[2]), encoding="ascii"))
        elif data == b'3':
            continue
        elif data == b'4':
            positioned = True

def returnTray():
    robot.sendall(bytes(str(4), encoding="ascii"))
    returned = False
    while not returned:
        data = robot.recv(1)
        if data == b'1':
            returned = True

def tower1(linear = False):
    if not linear:
        robot.sendall(bytes(str(1), encoding="ascii"))
    else:
        robot.sendall(bytes(str(9), encoding="ascii"))
    done = False
    while not done:
        data = robot.recv(1)
            
        if data == b'1':
            done = True

def readyScanPosition():
    robot.sendall(bytes(str(3), encoding="ascii"))
    done = False
    while not done:
        data = robot.recv(1)
        if data == b'1':
            done = True


def positionSample(pos):
    robot.sendall(bytes(str(11), encoding="ascii"))
    moved = False
    while not moved:
        data = robot.recv(1)
        if data == b'0':
            robot.sendall(bytes(str(90-((5-pos)*38)), encoding="ascii"))
        elif data == b'1':
            robot.sendall(bytes(str(0), encoding="ascii"))
        elif data == b'3':
            moved = True

def startScanMovement(pos, passes):
    robot.sendall(bytes(str(8), encoding="ascii"))
    done = False
    while not done:
        data = robot.recv(1)
        if data == b'0':
            robot.sendall(bytes(str(90-((5-pos)*38)), encoding="ascii"))
        elif data == b'1':
            robot.sendall(bytes(str(0), encoding="ascii"))
        elif data == b'2':
            robot.sendall(bytes(str(0), encoding="ascii"))
        elif data == b'3':
            done = True

def stopScanMovement():
    robot.sendall(bytes(str(0), encoding="ascii"))
    stopped = False
    while not stopped:
        data = robot.recv(1)
        if data == b'0':
            stopped = True
            # robot.sendall(bytes(str(8), encoding="ascii"))

def lockPiston():
    robot.sendall(bytes(str(6), encoding="ascii"))
    locked = False
    while not locked:
        data = robot.recv(1)
        if data == b'0':
            locked = True

def openPiston():
    robot.sendall(bytes(str(7), encoding="ascii"))
    open = False
    while not open:
        data = robot.recv(1)
        if data == b'0':
            open = True

def startMap():
    robot.sendall(bytes(str(10), encoding="ascii"))
    res = False
    while not res:
        data = robot.recv(1)
        if data == b'0':
            res = True

def pictureMove():
    robot.sendall(bytes(str(12), encoding="ascii"))
    res = False
    while not res:
        data = robot.recv(1)
        if data == b'0':
            res = True

def offRight():
    robot.sendall(bytes(str(4), encoding="ascii"))
    res = False
    while not res:
        data = robot.recv(1)
        if data == b'0':
            res = True

def offReturn():
    robot.sendall(bytes(str(2), encoding="ascii"))
    res = False
    while not res:
        data = robot.recv(1)
        if data == b'0':
            res = True

def offDown():
    robot.sendall(bytes(str(3), encoding="ascii"))
    res = False
    while not res:
        data = robot.recv(1)
        if data == b'0':
            res = True

def stopMap():
    robot.sendall(bytes(str(1), encoding="ascii"))
    res = False
    while not res:
        data = robot.recv(1)
        if data == b'0':
            res = True