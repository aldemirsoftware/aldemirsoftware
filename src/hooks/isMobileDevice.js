// iPadOS can report a desktop Mac user agent when a trackpad is connected.
export default function isMobileDevice(device = navigator) {
  return device.userAgentData?.mobile === true ||
    /Android|iPhone|iPad|iPod|Mobile/i.test(device.userAgent || "") ||
    (/Macintosh|MacIntel/i.test(`${device.userAgent || ""} ${device.platform || ""}`) && device.maxTouchPoints > 1);
}
