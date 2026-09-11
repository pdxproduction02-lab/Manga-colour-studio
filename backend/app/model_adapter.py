class ColorizationModel:
    # Stable interface for a real licensed ML checkpoint.
    def __init__(self, device="cpu"):
        self.device = device

    def predict(self, image, prompt="", palette=None):
        raise NotImplementedError(
            "Configure a licensed ML colorization backend."
        )
