class BaseValidator:
    REQUIRED_KEYS = []

    def validate(self, data):
        return all(
            key in data.keys()
            for key in self.REQUIRED_KEYS)


class UserValidator(BaseValidator):
    REQUIRED_KEYS = ('username', 'password')


class PotionValidator(BaseValidator):
    REQUIRED_KEYS = ('name')
