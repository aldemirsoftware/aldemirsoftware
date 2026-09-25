import { translate } from './Language';

test('translates dynamic labels and retains meaningful brand names', () => {
  expect(translate('İnşaat & Şantiye Yönetimi hakkında görüşelim', 'en')).toBe('Construction & Site Management — let’s discuss your requirements');
  expect(translate('Web çözümleri: Güçlü bir dijital ilk izlenim.', 'en')).toBe('Web solutions: A powerful first impression online.');
  expect(translate('Mir Yapı Mühendislik logosu', 'en')).toBe('Mir Yapı Mühendislik logo');
  expect(translate('  İletişim ', 'en')).toBe('  Contact ');
  expect(translate('İletişim', 'tr')).toBe('İletişim');
});
