import numpy as np
import socket
import pandas as pd
import serial
from datetime import date

today = str(date.today()).split("-")[1]+"-"+str(date.today()).split("-")[2]+"-"+str(date.today()).split("-")[0]
folder = "F:/LIBS DB/"+today+"/runs/"
run = str(1)
channel1 = 0
channel2 = 0
pixels1 = 4096
pixels2 = 4096
wavelength1 = [0.0] * 4096
wavelength2 = [0.0] * 4096
spectraldata1 = [0.0] * 4096
spectraldata2 = [0.0] * 4096
scan = False
maxFrames = 50
scans = 0
uvExposure = 10000
visibleExposure = 2500
measconfig1 = ""
measconfig2 = ""
fileName = "my measurement"
spectra = []
wavelengths = ""
tower1 =  np.array([
    [-10,-66,7],
    [-40,-68,7],
    [-70,-69,7],
    [-101,-70.5,7],
    [-132,-72,7],
    [-164,-73.5,7],
    [-196,-75,7.5],
    [-228,-75.5,8],
    [-261,-75.5,9.5],
    [-292.5,-75.5,9.5]
])
tower2 = np.array([
    [0,0]
])

robot = socket.socket()
robotHost = "192.168.1.6"
robotPort = 3000
pdg = serial.Serial()
pdg.port = "COM9"
pdg.baudrate = 115200
pdg.timeout = 0
pdg.parity = serial.PARITY_EVEN
pdg.rtscts = 1
iris = socket.socket()
names = [
    [18006027550,
    17502452100,
18006038550,
18006090550,
18006084550,
],
    [18006035550,
18006058550,
17502436100,
17001280550,
17001365550,
],
# [
#     10501746,
#     10501789,
#     10501676,
#     19003762,
#     19003314],

#     [18502084,
#     19003630,
#     18502158,
#     17507128,
#     17001324
#     ],

    [17001273550,
18005986550,
17001282550,
17001335550,
17001284550
],
    [17001320550,
17001293550,
17507146550,
17001292550,
17507136550
],
    [17001315550,
17502388100,
17507191550,
18006018550,
18006041550
],
    [17001373550,
17001354550,
17502476100,
18006063550,
17001343550
],
    [17001316550,
17502394100,
17507193550,
17001327550,
17507199550
],
    [17502396100,
17502421100,
17502463100,
17507126550,
17507138550
],
    [17507106550,
17001313550,
17507099550,
17507089550,
17001355550
],
    [17001338550,
17001308550,
17001279550,
17001366550,
17507155550
]
]

data = []
