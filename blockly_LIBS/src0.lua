resultCreate1,socket1 = TCPCreate(true, '192.168.1.6', 3000)
  if resultCreate1 == 0 then
      print("Create TCP Server Success!")
  else
      print("Create TCP Server failed, code:", resultCreate1)
  end
  resultCreate1 = TCPStart(socket1, 0)
  if resultCreate1 == 0 then
      print("Listen TCP Client Success!")
  else
      print("Listen TCP Client failed, code:", resultCreate1)
  end
  DO(1,1)
DO(2,0)
Sync()
while 1 do
  Sleep(50)
  resultRead1,mode = TCPRead(socket1, 1,'string')
  mode = mode.buf
  mode = tonumber(mode)
  Sync()
  while not (not (mode==NaN)) do
    Sleep(50)
    resultRead1,mode = TCPRead(socket1, 1,'string')
    mode = mode.buf
    mode = tonumber(mode)
  end
  start_routine = 0
  resultWrite1 = TCPWrite(socket1, start_routine)
  Sync()
  print('Mode:')
  Sync()
  print(mode)
  Sync()
  if mode==0 then
    resultRead1,height = TCPRead(socket1, 1,'string')
    height = height.buf
    height = tonumber(height)
    Sync()
    while not (not (height==NaN)) do
      Sleep(50)
      resultRead1,height = TCPRead(socket1, 1,'string')
      height = height.buf
      height = tonumber(height)
      Sync()
      print('waiting for height')
    end
    start_routine = 1
    resultWrite1 = TCPWrite(socket1, start_routine)
    scan_start = 0
    resultRead1,start = TCPRead(socket1, 1,'string')
    start = start.buf
    start = tonumber(start)
    Sync()
    while not (not (start==NaN)) do
      Sleep(50)
      resultRead1,start = TCPRead(socket1, 1,'string')
      start = start.buf
      start = tonumber(start)
    end
    start_routine = 2
    resultWrite1 = TCPWrite(socket1, start_routine)
    resultRead1,up = TCPRead(socket1, 1,'string')
    up = up.buf
    up = tonumber(up)
    Sync()
    while not (not (up==NaN)) do
      Sleep(50)
      resultRead1,up = TCPRead(socket1, 1,'string')
      up = up.buf
      up = tonumber(up)
    end
    start_routine = 3
    resultWrite1 = TCPWrite(socket1, start_routine)
  else
    Sync()
    if mode==1 then
      MovJ((P2))
      Sync()
      start_routine = 1
      resultWrite1 = TCPWrite(socket1, start_routine)
    else
      Sync()
      if mode==2 then
        print('Hello world!')
      else
        Sync()
        if mode==3 then
          MovJ((P5))
          Sync()
          start_routine = 1
          resultWrite1 = TCPWrite(socket1, start_routine)
        else
          Sync()
          if mode==4 then
            RelMovL({0,0,height,0})
            RelMovL({0,0,up,0})
            RelMovL({0,0,8,0})
            RelMovL({0,start,0,0})
            RelMovL({0,0,-8,0})
            DO(1,1)
            DO(2,0)
            RelMovL({0,0,(-1*up),0})
            RelMovL({0,(-1*start),0,0})
            MovL((P2))
            Sync()
            start_routine = 1
            resultWrite1 = TCPWrite(socket1, start_routine)
          else
            Sync()
            if mode==5 then
              RelMovL({0,0,height,0})
              RelMovL({0,start,0,0})
              RelMovL({0,0,up,0})
              DO(1,0)
              DO(2,1)
              RelMovL({0,0,8,0})
              RelMovL({0,(-1*start),0,0})
              Sync()
              start_routine = 1
              resultWrite1 = TCPWrite(socket1, start_routine)
            else
              Sync()
              if mode==6 then
                DO(1,0)
                DO(2,1)
                Sync()
                start_routine = 1
                resultWrite1 = TCPWrite(socket1, start_routine)
              else
                Sync()
                if mode==7 then
                  DO(1,1)
                  DO(2,0)
                  Sync()
                  start_routine = 1
                  resultWrite1 = TCPWrite(socket1, start_routine)
                else
                  Sync()
                  if mode==8 then
                    resultRead1,horiz = TCPRead(socket1, 1,'string')
                    horiz = horiz.buf
                    horiz = tonumber(horiz)
                    Sync()
                    while not (not (horiz==NaN)) do
                      Sleep(50)
                      resultRead1,horiz = TCPRead(socket1, 1,'string')
                      horiz = horiz.buf
                      horiz = tonumber(horiz)
                    end
                    start_routine = 1
                    resultWrite1 = TCPWrite(socket1, start_routine)
                    resultRead1,vert = TCPRead(socket1, 1,'string')
                    vert = vert.buf
                    vert = tonumber(vert)
                    Sync()
                    while not (not (vert==NaN)) do
                      Sleep(50)
                      resultRead1,vert = TCPRead(socket1, 1,'string')
                      vert = vert.buf
                      vert = tonumber(vert)
                    end
                    start_routine = 2
                    resultWrite1 = TCPWrite(socket1, start_routine)
                    resultRead1,passes = TCPRead(socket1, 1,'string')
                    passes = passes.buf
                    passes = tonumber(passes)
                    Sync()
                    while not (not (passes==NaN)) do
                      Sleep(50)
                      resultRead1,passes = TCPRead(socket1, 1,'string')
                      passes = passes.buf
                      passes = tonumber(passes)
                    end
                    RelMovL({5,0,0,0})
                    RelMovL({vert,horiz,-35,0})
                    start_routine = 3
                    Sync()
                    print('Strting routine')
                    resultWrite1 = TCPWrite(socket1, start_routine)
                    count = 0
                    resultRead1,scan = TCPRead(socket1, 1,'string')
                    scan = scan.buf
                    scan = tonumber(scan)
                    passes = 12
                    Sync()
                    while not (not (scan==NaN)) do
                      Sleep(50)
                      resultRead1,scan = TCPRead(socket1, 1,'string')
                      scan = scan.buf
                      scan = tonumber(scan)
                      Sync()
                      for count = 1, 6 do
                        RelMovL({30,0,0,0}, {SpeedL=100, AccL=100, CP=2})
                        RelMovL({0,-2,0,0}, {SpeedL=100, AccL=100, CP=2})
                        RelMovL({-30,0,0,0}, {SpeedL=100, AccL=100, CP=2})
                        RelMovL({0,-2,0,0}, {SpeedL=100, AccL=100, CP=2})
                        Sync()
                        Sleep(50)
                      end
                      count = count + 1
                      RelMovL({0,24,0,0})
                      Sync()
                      Sync()
                      print('finish')
                    end
                    start_routine = 0
                    resultWrite1 = TCPWrite(socket1, start_routine)
                  else
                    Sync()
                    if mode==9 then
                      MovL((P2))
                      Sync()
                      start_routine = 1
                      resultWrite1 = TCPWrite(socket1, start_routine)
                    else
                      Sync()
                      if mode==10 then
                        Sync()
                        while not (not (mode==NaN)) do
                          Sleep(50)
                          resultRead1,mode = TCPRead(socket1, 1,'string')
                          mode = mode.buf
                          mode = tonumber(mode)
                        end
                        Sync()
                        while not (mode==1) do
                          Sleep(50)
                          Sync()
                          if mode==2 then
                            RelMovL({0,-24,0,0})
                            Sync()
                          else
                            Sync()
                            if mode==3 then
                              RelMovL({1,0,0,0})
                              Sync()
                            else
                              RelMovL({0,1,0,0})
                              Sync()
                            end
                          end
                          start_routine = 0
                          resultWrite1 = TCPWrite(socket1, start_routine)
                          resultRead1,mode = TCPRead(socket1, 1,'string')
                          mode = mode.buf
                          mode = tonumber(mode)
                          Sync()
                          while not (not (mode==NaN)) do
                            Sleep(50)
                            resultRead1,mode = TCPRead(socket1, 1,'string')
                            mode = mode.buf
                            mode = tonumber(mode)
                          end
                        end
                      else
                        Sync()
                        if mode==11 then
                          RelMovL({0,0,-35,0})
                          Sync()
                          resultRead1,horiz = TCPRead(socket1, 1,'string')
                          horiz = horiz.buf
                          horiz = tonumber(horiz)
                          Sync()
                          while not (not (horiz==NaN)) do
                            Sleep(50)
                            resultRead1,horiz = TCPRead(socket1, 1,'string')
                            horiz = horiz.buf
                            horiz = tonumber(horiz)
                          end
                          start_routine = 1
                          resultWrite1 = TCPWrite(socket1, start_routine)
                          resultRead1,vert = TCPRead(socket1, 1, 'string')
                          vert = vert.buf
                          Sync()
                          while not (not (vert==NaN)) do
                            Sleep(50)
                            resultRead1,vert = TCPRead(socket1, 1, 'string')
                            vert = vert.buf
                          end
                          start_routine = 2
                          resultWrite1 = TCPWrite(socket1, start_routine)
                          RelMovL({5,0,0,0})
                          RelMovL({vert,horiz,0,0})
                          Sync()
                          start_routine = 3
                          resultWrite1 = TCPWrite(socket1, start_routine)
                        else
                          Sync()
                          if mode==12 then
                            RelMovL({0,0,height,0})
                            RelMovL({0,start,0,0})
                            RelMovL({up,0,0,0})
                            Sync()
                            Sleep(2 * 1000)
                            start_routine = 0
                            resultWrite1 = TCPWrite(socket1, start_routine)
                          else
                            print('Hello world!')
                          end
                        end
                      end
                    end
                  end
                end
              end
            end
          end
        end
      end
    end
  end
end
