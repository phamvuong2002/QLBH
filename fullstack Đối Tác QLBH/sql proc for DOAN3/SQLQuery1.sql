select *from DOITAC
select *from MENU

create
--alter
proc listMonAnByDoiTac
	@masothue char(15)
as
begin
	if not exists(select *from DOITAC where MASOTHUE = @masothue)
	begin
		select 'Partner Is Not Found' AS 'ERROR'
	end
	select MA.TENMON, MA.MIEUTA, MA.GIA, MA.TINHTRANG, MA.SLDABAN, MA.GHICHU from MENU M join MONAN MA on M.MASOTHUE = @masothue and M.TENMON = MA.TENMON
end

exec listMonAnByDoiTac 'tax0001'
exec GetParnersByID 'tax0200'

insert MONAN values ('Mon A', 'Bun', 15000,'Con Hang', 50,'Co Nuoc')
insert MONAN values ('Mon B', 'Com', 15000,'Con Hang', 60,'Co Nuoc Mam')
insert MONAN values ('Mon C', 'Pho', 25000,'Con Hang', 90,'Co Nuoc')
insert MONAN values ('Mon E', 'Banh Xeo', 15000,'Con Hang', 100,'Co Nuoc Mam')
insert MONAN values ('Mon D', 'Banh Canh', 15000,'Con Hang', 50,'Co Nuoc')
insert MONAN values ('Mon F', 'Banh Uot', 15000,'Con Hang', 70,'Co Nuoc Mam')
insert MONAN values ('Mon G', 'Sinh To', 15000,'Con Hang', 150,'Co ong hut, muon')
insert MONAN values ('Mon H', 'NGK', 10000,'Con Hang', 450,'Uop Lanh')
insert MONAN values ('Mon K', 'Nem', 15000,'Con Hang', 20,'Chua Vua')

insert MENU values ('tax0001', 'Mon A')
insert MENU values ('tax0001', 'Mon B')
insert MENU values ('tax0001', 'Mon C')
insert MENU values ('tax0001', 'Mon D')
insert MENU values ('tax0001', 'Mon E')
insert MENU values ('tax0001', 'Mon F')
insert MENU values ('tax0001', 'Mon G')
insert MENU values ('tax0001', 'Mon H')
insert MENU values ('tax0001', 'Mon K')

