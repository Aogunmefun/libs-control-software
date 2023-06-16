import numpy as np
from time import sleep
import sys
import json
from avaspec import * 
import globals
import matplotlib.pyplot as plt
import h5py as h5
from array import *
from robotCommands import *
from datetime import date
import os

##### Connecting to Devices #####
def connectPDG(input): # Connecting to PDG
    val = input[0]
    if val:
        globals.pdg.open()
        if (globals.pdg.is_open):
            return True
        else:
            return False
    else:
        globals.pdg.close()
        if (globals.pdg.is_open):
            return False
        else:
            return True

def connectSpectrometer(input): # Connect to spectrometer
    val = input[0]
    
    if (val):
        if (AVS_Init(0) < 2):
            
            return False
        else:
            
            if(AVS_UpdateUSBDevices() < 2):
           
                return False
            
            mylist = AvsIdentityType()
            mylist = AVS_GetList(1)
            deviceNumbers = str(mylist[0].SerialNumber.decode("utf-8")) + " & " + str(mylist[1].SerialNumber.decode("utf-8"))
            globals.channel1 = AVS_Activate(mylist[0])
            globals.channel2 = AVS_Activate(mylist[1])
            ret = AVS_UseHighResAdc(globals.channel1, True)
            ret = AVS_UseHighResAdc(globals.channel2, True)
            devcon1 = DeviceConfigType()
            devcon2 = DeviceConfigType()
            devcon1 = AVS_GetParameter(globals.channel1, 63484)
            devcon2 = AVS_GetParameter(globals.channel2, 63484)
            globals.pixels1 = devcon1.m_Detector_m_NrPixels
            globals.pixels2 = devcon2.m_Detector_m_NrPixels
            globals.wavelength1 = AVS_GetLambda(globals.channel1)
            globals.wavelength2 = AVS_GetLambda(globals.channel2)
            
            # print(deviceNumbers)
            
            return True
    else:
        sleep(1)
        
        # Need a way to deativate

def connectRobot(val): # Connect Robot
    if val:
        globals.robot.connect((globals.robotHost, globals.robotPort))
        return True
    else:
        globals.robot.close()
        return True


##### Run LIBS #####

def newData1():
    ret = AVS_GetScopeData(globals.channel1)
    globals.spectraldata1 = ret[1]
    # print("channel 1", globals.spectraldata1[0])

def newData2():
    ret = AVS_GetScopeData(globals.channel2)
    globals.spectraldata2 = ret[1]

    x1 = np.array(globals.wavelength1)
    y1 = np.array(globals.spectraldata1)
    x2 = np.array(globals.wavelength2)
    y2 = np.array(globals.spectraldata2)
    
    x = np.concatenate((x1, x2), axis=0)
    y = np.concatenate((y1, y2), axis=0)
    y = y[np.newaxis]
    
    try:
        if globals.scans == 1:
            # globals.spectra = y[np.newaxis]
            # print("Yshape", y.shape)
            globals.wavelengths = x
            os.makedirs(globals.folder+globals.run, exist_ok = True)
            with h5.File(globals.folder+globals.run+"/"+globals.fileName+".h5", "a") as f:
                f.create_dataset(
                    name  = "wavelength",
                    shape = globals.wavelengths.shape,
                    data= globals.wavelengths
                )
                f.create_dataset(
                    name="intensity",
                    maxshape=(None, y.shape[1]),
                    shape=(0,y.shape[1])
                )
                # print("intnesityShape", f["intensity"].shape)
                f["intensity"].resize((f["intensity"].shape[0] + y.shape[0]), axis = 0)
                f["intensity"][f["intensity"].shape[0]-1:] = y

        else:
            with h5.File(globals.folder+globals.run+"/"+globals.fileName+".h5", "a") as f:
                f["intensity"].resize((f["intensity"].shape[0] + y.shape[0]), axis = 0)
                f["intensity"][f["intensity"].shape[0]-1:] = y
    except Exception as e:
        print(e)

def startSpectrometer(name):
    
    globals.measconfig1 = MeasConfigType()
    globals.measconfig1.m_StartPixel = 0
    # globals.measconfig1.m_StopPixel = globals.pixels1 - 1
    globals.measconfig1.m_StopPixel = 2047
    globals.measconfig1.m_IntegrationTime = float(2)
    globals.measconfig1.m_IntegrationDelay = 0
    globals.measconfig1.m_NrAverages = int(1)
    globals.measconfig1.m_CorDynDark_m_Enable = 0  # nesting of types does NOT work!!
    globals.measconfig1.m_CorDynDark_m_ForgetPercentage = 0
    globals.measconfig1.m_Smoothing_m_SmoothPix = 0
    globals.measconfig1.m_Smoothing_m_SmoothModel = 0
    globals.measconfig1.m_SaturationDetection = 0
    globals.measconfig1.m_Trigger_m_Mode = 1
    globals.measconfig1.m_Trigger_m_Source = 0
    globals.measconfig1.m_Trigger_m_SourceType = 0
    globals.measconfig1.m_Control_m_StrobeControl = 0
    globals.measconfig1.m_Control_m_LaserDelay = 0
    globals.measconfig1.m_Control_m_LaserWidth = 0
    globals.measconfig1.m_Control_m_LaserWaveLength = 0.0
    globals.measconfig1.m_Control_m_StoreToRam = 0

    globals.measconfig2 = MeasConfigType()
    globals.measconfig2.m_StartPixel = 0
    # globals.measconfig2.m_StopPixel = globals.pixels1 - 1
    globals.measconfig2.m_StopPixel = 2047
    globals.measconfig2.m_IntegrationTime = float(5)
    globals.measconfig2.m_IntegrationDelay = 0
    globals.measconfig2.m_NrAverages = int(1)
    globals.measconfig2.m_CorDynDark_m_Enable = 0  # nesting of types does NOT work!!
    globals.measconfig2.m_CorDynDark_m_ForgetPercentage = 0
    globals.measconfig2.m_Smoothing_m_SmoothPix = 0
    globals.measconfig2.m_Smoothing_m_SmoothModel = 0
    globals.measconfig2.m_SaturationDetection = 0
    globals.measconfig2.m_Trigger_m_Mode = 1
    globals.measconfig2.m_Trigger_m_Source = 1
    globals.measconfig2.m_Trigger_m_SourceType = 0
    globals.measconfig2.m_Control_m_StrobeControl = 0
    globals.measconfig2.m_Control_m_LaserDelay = 0
    globals.measconfig2.m_Control_m_LaserWidth = 0
    globals.measconfig2.m_Control_m_LaserWaveLength = 0.0
    globals.measconfig2.m_Control_m_StoreToRam = 0


    AVS_SetSyncMode(globals.channel1, 1)


    
    nummeas = globals.maxFrames

def beginRoutine():
    startSpectrometer("my measurement")
    globals.measconfig1.m_IntegrationTime = float(7000/1000)
    globals.measconfig2.m_IntegrationTime = float(500/1000)
    globals.maxFrames = int("50")
    ret = AVS_PrepareMeasure(globals.channel1, globals.measconfig1)
    ret = AVS_PrepareMeasure(globals.channel2, globals.measconfig2)
    # print("Spectrometer Ready")

def startRoutine(tray, sample, name):
    globals.scan = True
    robotStopped = False
    globals.fileName = str(name)
    
    readyScanPosition()
    startScanMovement(sample,1)
    # print("yo")
    sleep(2)
    # print(globals.pdg.read(100))
    # print("PDG triggered")
    # print("Scan Started**************************************")
    globals.spectra = np.zeros((globals.maxFrames, 8192))
    
    globals.scans = 0
    globals.scan = True
    globals.pdg.write(b':PULSE0:STATE ON\r\n')
    # ret = AVS_Measure(globals.channel2, 0, -1)
    while (globals.scan == True):
        ret = AVS_Measure(globals.channel2, 0, 1)
        ret = AVS_Measure(globals.channel1, 0, 1)
        dataready = False
        dataready2 = False
        while (dataready == False):
            dataready = (AVS_PollScan(globals.channel1) == True)
            time.sleep(0.001)
        if dataready == True:
            globals.scans = globals.scans + 1
            # print("frame: " + str(globals.scans))
            newData1()
            # newData2()
        while (dataready2 == False):
            # print("no data")
            dataready2 = (AVS_PollScan(globals.channel2) == True)
            time.sleep(0.001)
        if dataready2 == True:
            newData2()
        # dataready2 = (AVS_PollScan(globals.channel2) == True)
        # time.sleep(0.001)
        # if (dataready2):
        #     globals.scans = globals.scans + 1
        #     newData2()

        if (globals.scans >= globals.maxFrames):
            globals.scan = False
            globals.pdg.write(b':PULSE0:STATE OFF\r\n')
            AVS_StopMeasure(globals.channel1)
            AVS_StopMeasure(globals.channel2)
            # print("Measurement Stopped")
            sleep(2)
            # print(globals.pdg.read(100))
            # print(globals.spectra.shape)
            # print(globals.wavelengths.shape)
            stopScanMovement()

def runAll(args):


    try:
        contents = os.listdir(globals.folder)
        globals.run ="run"+str(int(contents[len(contents)-1][3:]) + 1)
    except Exception as e:
        # print(e)
        globals.run="run1"
    
    for row in range(1):
        # print(1)
        
        beginRoutine()
        tower1()
        setPosition(globals.tower1[row,:])
        grabSample()
        tower1(True)
        for comp in range(1):
            startRoutine(row+1, comp+1, globals.names[row][comp])
            
        readyScanPosition()
        tower1()
        returnTray()

def runSelected(indexes):
    # print(len(indexes))
    for ind in indexes:
        beginRoutine()
        tower1()
        setPosition(globals.tower1[ind,:])
        grabSample()
        tower1(True)
        for comp in range(5):
            startRoutine(ind+1, comp+1, globals.names[ind][comp])
            
        readyScanPosition()
        tower1()
        returnTray()


libs = {
    "connectPDG": connectPDG,
    "connectSpectrometer": connectSpectrometer,
    "connectRobot": connectRobot,
    "runAll": runAll

}


while (1):
    data = sys.stdin.readline()
    data = json.loads(data)
    # print("data", data)
    # print(libs[data["function"]](data["arguments"]))
    # contents = os.listdir(globals.folder)
    # print("run", contents[len(contents)-1][3:])
    res = libs[data["function"]](data["arguments"])
    print(json.dumps({"function": data["function"], "res": res}))
    sys.stdout.flush()