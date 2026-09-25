import isMobileDevice from './isMobileDevice';
test('recognizes tablets reporting a desktop Mac identity without excluding desktop Macs', () => {
  expect(isMobileDevice({userAgent:'Mozilla/5.0 (Macintosh; Intel Mac OS X)', platform:'MacIntel', maxTouchPoints:5})).toBe(true);
  expect(isMobileDevice({userAgent:'Mozilla/5.0 (Macintosh; Intel Mac OS X)', platform:'MacIntel', maxTouchPoints:0})).toBe(false);
  expect(isMobileDevice({userAgentData:{mobile:true}})).toBe(true);
});
