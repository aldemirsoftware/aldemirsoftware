import { translate } from './Language';

test('translates dynamic labels and retains meaningful brand names', () => {
  expect(translate('İnşaat & Şantiye Yönetimi hakkında görüşelim', 'en')).toBe('Construction & Site Management — let’s discuss your requirements');
  expect(translate('Web çözümleri: Güçlü bir dijital ilk izlenim.', 'en')).toBe('Web solutions: A powerful first impression online.');
  expect(translate('Mir Yapı Mühendislik logosu', 'en')).toBe('Mir Yapı Mühendislik logo');
  expect(translate('  İletişim ', 'en')).toBe('  Contact ');
  expect(translate('İletişim', 'tr')).toBe('İletişim');
});

test('German has a complete dictionary and translates dynamic labels', () => {
  const english = require('./en.json');
  const german = require('./de.json');
  expect(Object.keys(german).sort()).toEqual(Object.keys(english).sort());
  expect(Object.values(german).every(value => typeof value === 'string' && value.trim())).toBe(true);
  expect(translate('Web çözümleri görselini incele', 'de')).toBe('Weblösungen — Bild ansehen');
  expect(translate('Müzik ses ayarları', 'de')).toBe('Musikeinstellungen');
});
