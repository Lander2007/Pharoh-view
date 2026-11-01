$bytes = [System.IO.File]::ReadAllBytes("public\logo.png")
$ico = New-Object byte[] (22 + $bytes.Length)

# ICONDIR header
$ico[0] = 0; $ico[1] = 0
$ico[2] = 1; $ico[3] = 0
$ico[4] = 1; $ico[5] = 0

# ICONDIRENTRY
$ico[6] = 0
$ico[7] = 0
$ico[8] = 0
$ico[9] = 0
$ico[10] = 1; $ico[11] = 0
$ico[12] = 32; $ico[13] = 0

$len = $bytes.Length
$ico[14] = [byte]($len -band 0xFF)
$ico[15] = [byte](($len -shr 8) -band 0xFF)
$ico[16] = [byte](($len -shr 16) -band 0xFF)
$ico[17] = [byte](($len -shr 24) -band 0xFF)

$ico[18] = 22; $ico[19] = 0; $ico[20] = 0; $ico[21] = 0

[System.Array]::Copy($bytes, 0, $ico, 22, $bytes.Length)
[System.IO.File]::WriteAllBytes("public\favicon.ico", $ico)
Write-Host "Generated public\favicon.ico with size: $($ico.Length)"
