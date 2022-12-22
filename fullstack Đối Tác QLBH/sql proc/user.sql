﻿USE QLBH_1
GO

--DROP PROC IF EXISTS USP_GetStores
--GO

--CREATE 
----ALTER 
--PROC USP_GetStores
--AS
--BEGIN TRAN
--	SELECT C.TENQUAN, M.TENMON, M.MIEUTA, M.GIA 
--	FROM (MONAN M JOIN PHUCVU P ON M.TENMON = P.TENMON) JOIN CUAHANG C ON C.MACUAHANG = P.MACUAHANG
--COMMIT TRAN
--GO

--DROP PROC IF EXISTS USP_GetDisks
--GO

--CREATE 
----ALTER 
--PROC USP_GetDisks
--AS
--BEGIN TRAN
--	SELECT C.TENQUAN, M.TENMON, M.MIEUTA, M.GIA 
--	FROM (MONAN M JOIN PHUCVU P ON M.TENMON = P.TENMON) JOIN CUAHANG C ON C.MACUAHANG = P.MACUAHANG
--COMMIT TRAN
--GO

--EXEC USP_GetDisks

-- DROP PROC IF EXISTS USP_GetStoreByID
-- GO

-- CREATE 
-- --ALTER 
-- PROC USP_GetStoreByID
-- 	@ID CHAR(15)
-- AS
-- BEGIN TRAN
-- 	IF NOT EXISTS (SELECT MACUAHANG FROM CUAHANG WHERE TRIM(MACUAHANG) = TRIM(@ID))
-- 		BEGIN
-- 			SELECT 'MACUAHANG IS NOT EXIST' AS 'ERROR'
-- 			ROLLBACK TRAN
-- 			RETURN 0
-- 		END

-- 	SELECT M.TENMON, M.MIEUTA, M.GIA 
-- 	FROM MONAN M JOIN PHUCVU P ON M.TENMON = P.TENMON WHERE TRIM(P.MACUAHANG) = TRIM(@ID)
-- COMMIT TRAN
-- GO

--EXEC USP_GetStoreByID @ID = 'CH853CAQ'

DROP PROC IF EXISTS USP_GetStoreByName
GO

CREATE 
--ALTER 
PROC USP_GetStoreByName
	@Name NCHAR(35)
AS
BEGIN TRAN
	IF NOT EXISTS (SELECT TENQUAN FROM CUAHANG WHERE TRIM(TENQUAN) = TRIM(@Name))
		BEGIN
			SELECT 'TENQUAN IS NOT EXIST' AS 'ERROR'
			ROLLBACK TRAN
			RETURN 0;
		END
	
	-- tại thời điểm đặt hàng có đang mở cửa không
	DECLARE @CURRENT TIME
	SELECT @CURRENT = CONVERT(TIME, GETDATE())
	IF @CURRENT < (SELECT GIOMOCUA FROM CUAHANG WHERE TRIM(TENQUAN) = TRIM(@Name))
	OR @CURRENT > (SELECT GIODONGCUA FROM CUAHANG WHERE TRIM(TENQUAN) = TRIM(@Name))
		BEGIN
			SELECT TRIM(@Name) + ' IS CLOSED' AS 'ERROR'
			ROLLBACK TRAN
			RETURN 0;
		END
	
	-- tình trạng của của hàng có đang còn hàng không 
	DECLARE @STATE NCHAR(20)
	SELECT @STATE = TINHTRANG FROM CUAHANG WHERE TRIM(TENQUAN) = TRIM(@Name)
	IF TRIM(@STATE) = N'Hết Hàng'
		BEGIN
			SELECT N'Cửa hàng hiện đang hết hàng' AS 'ERROR'
			ROLLBACK TRAN
			RETURN 0
		END
	IF TRIM(@STATE) = N'Tạm Ngưng'
		BEGIN
			SELECT N'Cửa hàng hiện đang tạm ngưng' AS 'ERROR'
			ROLLBACK TRAN
			RETURN 0
		END
	IF TRIM(@STATE) = N'Sắp Bán'
		BEGIN
			SELECT N'Coming soon' AS 'ERROR'
			ROLLBACK TRAN
			RETURN 0
		END

	-- cửa hàng có phục vụ món ăn nào không


	SELECT C.TENQUAN, M.TENMON, M.MIEUTA, M.GIA 
	FROM (MONAN M JOIN PHUCVU P ON M.TENMON = P.TENMON) JOIN CUAHANG C ON C.MACUAHANG = P.MACUAHANG
	WHERE TRIM(C.TENQUAN) = TRIM(@Name)
	SELECT 'GET STORE SUCCESSFULL' AS '1'
COMMIT TRAN
RETURN 1
GO

DECLARE @STORE NCHAR(35) = 'Groefantor  Inc                    '
SELECT * FROM CUAHANG WHERE TENQUAN = @STORE
SELECT * FROM PHUCVU WHERE TRIM(MACUAHANG) = TRIM('CH001YSX')       
--SELECT * FROM CUAHANG CH
--WHERE NOT EXISTS (SELECT PV.MACUAHANG FROM PHUCVU PV WHERE PV.MACUAHANG = CH.MACUAHANG)
EXEC USP_GetStoreByName @Name = @STORE
--DECLARE @MACH CHAR(15)
--SELECT @MACH = MACUAHANG FROM CUAHANG WHERE TENQUAN = @STORE
--SELECT * FROM PHUCVU WHERE MACUAHANG = @MACH

DROP PROC IF EXISTS USP_GetDiskByName
GO

CREATE 
--ALTER 
PROC USP_GetDiskByName
	@NAME NVARCHAR(80)
AS
BEGIN TRAN
	IF NOT EXISTS (SELECT TENMON FROM MONAN WHERE TRIM(TENMON) = TRIM(@Name))
		BEGIN
			SELECT 'TENMON IS NOT EXIST' AS 'ERROR'
			ROLLBACK TRAN
			RETURN 0
		END
	
	-- món ăn có đang còn hàng không
	DECLARE @STATE NCHAR(20)
	SELECT @STATE = TINHTRANG FROM MONAN WHERE TRIM(TENMON) = TRIM(@Name)
	IF TRIM(@STATE) = N'Hết Hàng'
		BEGIN
			SELECT N'Món ăn hiện đang hết hàng' AS 'ERROR'
			ROLLBACK TRAN
			RETURN 0
		END
	IF TRIM(@STATE) = N'Tạm Ngưng'
		BEGIN
			SELECT N'Món ăn hiện đang tạm ngưng' AS 'ERROR'
			ROLLBACK TRAN
			RETURN 0
		END

	SELECT C.TENQUAN, M.TENMON, M.MIEUTA, M.GIA 
	FROM (MONAN M JOIN PHUCVU P ON M.TENMON = P.TENMON) JOIN CUAHANG C ON C.MACUAHANG = P.MACUAHANG 
	WHERE TRIM(M.TENMON) = TRIM(@Name) 
	SELECT 'GET DISK SUCCESSFULL' AS '1'
COMMIT TRAN
RETURN 1
GO

--EXEC USP_GetDiskByName @NAME = 'Bánh AAA'

DROP PROC IF EXISTS USP_GetOrders
GO

CREATE 
--ALTER 
PROC USP_GetOrders
	@ID CHAR(15)
AS
BEGIN TRAN
	IF NOT EXISTS (SELECT MAKH FROM KHACHHANG WHERE TRIM(MAKH) = TRIM(@ID))
		BEGIN
			SELECT 'MAKH IS NOT EXIST' AS 'ERROR'
			ROLLBACK TRAN
			RETURN 0
		END

	SELECT MADONHANG, TONGGIA, TINHTRANG, NGAYLAP, DANHGIA 
	FROM DONDATHANG 
	WHERE TRIM(MAKH) = TRIM(@ID) 
	ORDER BY NGAYLAP DESC
	SELECT 'GET PERSONAL ORDERS SUCCESSFULL' AS '1'
COMMIT TRAN
RETURN 1
GO

--EXEC USP_GetOrders @ID = 'KH0093KY92     '

DROP PROC IF EXISTS USP_AddOrder
GO

CREATE 
--ALTER 
PROC USP_AddOrder
	@MADH CHAR(15),
	@MAKH CHAR(15),
	@SHIP FLOAT,
	@STATE NCHAR(20),
	@ADDRESS NCHAR(50),
	@METHOD NCHAR(15),
	@SUM FLOAT

AS
BEGIN TRAN
	IF NOT EXISTS (SELECT MAKH FROM KHACHHANG WHERE TRIM(MAKH) = TRIM(@MAKH))
		BEGIN
			SELECT 'MAKH IS NOT EXIST' AS 'ERROR'
			ROLLBACK TRAN
			RETURN 0
		END

	IF EXISTS (SELECT MADONHANG FROM DONDATHANG WHERE TRIM(MADONHANG) = TRIM(@MADH))
		BEGIN
			SELECT 'DONHANG IS EXISTED' AS 'ERROR'
			ROLLBACK TRAN
			RETURN 0
		END

	IF(@MADH IS NULL OR @MAKH IS NULL OR @SHIP IS NULL OR @STATE IS NULL 
	OR @ADDRESS IS NULL OR @METHOD IS NULL OR @SUM IS NULL)
		BEGIN 
			SELECT 'SOME OF THESE INPUTS WERE EMPTY' AS 'ERROR'
			ROLLBACK TRAN
			RETURN 0
		END

	--DONDATHANG
	INSERT INTO DONDATHANG (MADONHANG, MAKH, PHIVANCHUYEN, TINHTRANG, DIACHI, NGAYLAP, HINHTHUCTHANHTOAN, TONGGIA) VALUES (@MADH, @MAKH, @SHIP, @STATE, @ADDRESS, GETDATE(), @METHOD, @SUM)

	SELECT 'INSERT ORDER SUCCESSFULL' AS '1'
COMMIT TRAN
RETURN 1
GO

--EXEC USP_AddOrder @MADH = 'DH22231351412', @MAKH ='KH0093KY92' , @SHIP = 15, @STATE = N'Chờ xác nhận', @ADDRESS = 'ABCDEF', @METHOD = N'Trực tuyến', @SUM = '248.6' 

DROP PROC IF EXISTS USP_AddOrderStore
GO

CREATE 
--ALTER 
PROC USP_AddOrderStore
	@MADH CHAR(15),
	@TENQUAN NCHAR(35)

AS
BEGIN TRAN
	IF NOT EXISTS (SELECT MADONHANG FROM DONDATHANG WHERE TRIM(MADONHANG) = TRIM(@MADH))
		BEGIN
			SELECT 'DONHANG IS NOT EXIST' AS 'ERROR'
			ROLLBACK TRAN
			RETURN 0
		END

	IF NOT EXISTS (SELECT @MADH FROM DONDATHANG WHERE TRIM(MADONHANG) = TRIM(@MADH))
		BEGIN
			SELECT 'DONHANG IS NOT EXIST' AS 'ERROR'
			ROLLBACK TRAN
			RETURN 0
		END

	IF(@MADH IS NULL OR @TENQUAN IS NULL)
		BEGIN 
			SELECT 'SOME OF THESE INPUTS WERE EMPTY' AS 'ERROR'
			ROLLBACK TRAN
			RETURN 0
		END

	--DONHANG_CUAHANG
	DECLARE @MACUAHANG CHAR(15)
	SELECT @MACUAHANG = MACUAHANG FROM CUAHANG WHERE TRIM(TENQUAN) = TRIM(@TENQUAN)
	INSERT INTO DONHANG_CUAHANG (MACUAHANG, MADONHANG) VALUES (@MACUAHANG, @MADH)

	SELECT 'INSERT ORDER-STORE SUCCESSFULL' AS '1'
COMMIT TRAN
RETURN 1
GO

DROP PROC IF EXISTS USP_AddOrderDetail
GO

CREATE 
--ALTER 
PROC USP_AddOrderDetail
	@MADH CHAR(15),
	@TENMON NCHAR(80),
	@DONGIA FLOAT,
	@SOLUONG INT

AS
BEGIN TRAN
	IF NOT EXISTS (SELECT MADONHANG FROM DONDATHANG WHERE TRIM(MADONHANG) = TRIM(@MADH))
		BEGIN
			SELECT 'DONHANG IS NOT EXIST' AS 'ERROR'
			ROLLBACK TRAN
			RETURN 0
		END

	IF NOT EXISTS (SELECT TENMON FROM MONAN WHERE TRIM(TENMON) = TRIM(@TENMON))
		BEGIN
			SELECT 'TENMON IS NOT EXIST' AS 'ERROR'
			ROLLBACK TRAN
			RETURN 0
		END

	IF(@MADH IS NULL OR @TENMON IS NULL OR @DONGIA IS NULL OR @SOLUONG IS NULL)
		BEGIN 
			SELECT 'SOME OF THESE INPUTS WERE EMPTY' AS 'ERROR'
			ROLLBACK TRAN
			RETURN 0
		END

	--CHITIETDONHANG
	INSERT INTO CHITIETDONHANG (TENMON, MADONHANG, SOLUONG, DONGIA) VALUES (@TENMON, @MADH, @SOLUONG, @DONGIA)
	SELECT 'INSERT ORDER DETAIL SUCCESSFULL' AS '1'
COMMIT TRAN
RETURN 1
GO

--SELECT * FROM CHITIETDONHANG WHERE MADONHANG = 'DH222096167912'
--SELECT TENQUAN FROM CUAHANG WHERE MACUAHANG = (SELECT MACUAHANG FROM DONHANG_CUAHANG WHERE MADONHANG = 'DH222096167912')

DROP PROC IF EXISTS USP_UpdateFeedback
GO

CREATE 
--ALTER 
PROC USP_UpdateFeedback
	@MADONHANG CHAR(15),
	@MAKH CHAR(15),
	@DANHGIA CHAR(30)

AS
BEGIN TRAN
	IF NOT EXISTS (SELECT MAKH FROM KHACHHANG WHERE TRIM(MAKH) = TRIM(@MAKH))
		BEGIN
			SELECT 'MAKH IS NOT EXIST' AS 'ERROR'
			ROLLBACK TRAN
			RETURN 0
		END

	IF NOT EXISTS (SELECT MADONHANG, MAKH FROM DONDATHANG WHERE TRIM(MAKH) = TRIM(@MAKH) AND TRIM(MADONHANG) = TRIM(@MADONHANG))
		BEGIN
			SELECT 'THIS ORDER IS NOT EXIST' AS 'ERROR'
			ROLLBACK TRAN
			RETURN 0
		END

	IF(@MADONHANG IS NULL OR @MAKH IS NULL)
		BEGIN 
			SELECT 'SOME OF THESE INPUTS WERE EMPTY' AS 'ERROR'
			ROLLBACK TRAN
			RETURN 0
		END

	--DONDATHANG
	UPDATE DONDATHANG SET DANHGIA = @DANHGIA WHERE MADONHANG = @MADONHANG AND MAKH = @MAKH
	SELECT 'UPDATE SUCCESSFULL' AS '1'
COMMIT TRAN
RETURN 1
GO

--EXEC USP_UpdateFeedback @MADONHANG = 'DH1242ZL3801X', @MAKH = 'KH0093KY92', @DANHGIA = N'NULL'

--SELECT DANHGIA FROM DONDATHANG 
--WHERE MADONHANG = 'DH1242ZL3801X' AND MAKH = 'KH0093KY92'

--SELECT * FROM DONDATHANG DH JOIN CHITIETDONHANG CT ON DH.MADONHANG = CT.MADONHANG 
--SELECT * FROM CHITIETDONHANG WHERE DONGIA IS NULL

--DECLARE @SL INT
--DECLARE @TEN NCHAR(80)
--SET @SL = (SELECT A.SL FROM (SELECT M.TENMON AS TEN, SUM(CT.SOLUONG) AS SL
--											FROM CHITIETDONHANG CT JOIN MONAN M ON M.TENMON = CT.TENMON
--											GROUP BY M.TENMON) A)
--SET @TEN = (SELECT A.TEN FROM (SELECT M.TENMON AS TEN, SUM(CT.SOLUONG) AS SL
--											FROM CHITIETDONHANG CT JOIN MONAN M ON M.TENMON = CT.TENMON
--											GROUP BY M.TENMON) A)
--UPDATE MONAN SET SLDABAN = (SELECT A.SL FROM (SELECT M.TENMON AS TEN, SUM(CT.SOLUONG) AS SL
--											FROM CHITIETDONHANG CT JOIN MONAN M ON M.TENMON = CT.TENMON
--											GROUP BY M.TENMON) A)